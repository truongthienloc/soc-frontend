.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 109 
		addi    x10 , x0 , -2048 
		slti    x6 , x28 , 215 
		bltu    x28 , x10 , Less_i 
		bgeu    x28 , x10 , Bigger_i 
Less_i:
		ori     x24 , x28 , 40 
		sub     x31 , x10 , x28 
		srai    x31 , x31 , 4 
		and     x31 , x31 , x0 
		addi    x26 , x0 , 0 
		beq     x31 , x26 , Pass 
Bigger_i:
		ori     x24 , x28 , 59 
		sub     x31 , x10 , x28 
		srai    x31 , x31 , 1 
		and     x31 , x31 , x0 
		addi    x26 , x0 , 0 
		beq     x31 , x26 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
