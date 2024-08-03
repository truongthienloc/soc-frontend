.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 131 
		addi    x20 , x0 , -2048 
		slti    x21 , x28 , 293 
		bltu    x28 , x20 , Less_i 
		bgeu    x28 , x20 , Bigger_i 
Less_i:
		ori     x24 , x28 , 144 
		sub     x19 , x20 , x28 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x16 , x0 , 0 
		beq     x19 , x16 , Pass 
Bigger_i:
		ori     x24 , x28 , 59 
		sub     x19 , x20 , x28 
		srai    x19 , x19 , 2 
		and     x19 , x19 , x0 
		addi    x16 , x0 , 0 
		beq     x19 , x16 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
