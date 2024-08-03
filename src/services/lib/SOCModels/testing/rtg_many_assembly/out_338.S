.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , -2048 
		addi    x26 , x0 , 134 
		sltu    x2 , x6 , x26 
		bltu    x6 , x26 , Less_i 
		bgeu    x6 , x26 , Bigger_i 
Less_i:
		ori     x19 , x6 , 75 
		sub     x10 , x26 , x6 
		srai    x10 , x10 , 2 
		and     x10 , x10 , x0 
		addi    x12 , x0 , 0 
		beq     x10 , x12 , Pass 
Bigger_i:
		ori     x19 , x6 , 167 
		sub     x10 , x26 , x6 
		srai    x10 , x10 , 0 
		and     x10 , x10 , x0 
		addi    x12 , x0 , 0 
		beq     x10 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
