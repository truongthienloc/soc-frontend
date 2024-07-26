.text

#The program checks the ALU instruction in I_type

Main:
		addi    x8 , x0 , 25 
		addi    x31 , x0 , 24 
		sltu    x2 , x8 , x31 
		bltu    x8 , x31 , Less_i 
		bgeu    x8 , x31 , Bigger_i 
Less_i:
		ori     x25 , x8 , 132 
		sub     x19 , x31 , x8 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x28 , x0 , 0 
		beq     x19 , x28 , Pass 
Bigger_i:
		ori     x25 , x8 , 100 
		sub     x19 , x31 , x8 
		srai    x19 , x19 , 1 
		and     x19 , x19 , x0 
		addi    x28 , x0 , 0 
		beq     x19 , x28 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
