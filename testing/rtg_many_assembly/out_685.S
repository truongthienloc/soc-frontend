.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , -2048 
		addi    x13 , x0 , 88 
		sltu    x6 , x10 , x13 
		bltu    x10 , x13 , Less_i 
		bgeu    x10 , x13 , Bigger_i 
Less_i:
		ori     x19 , x10 , 133 
		sub     x5 , x13 , x10 
		srai    x5 , x5 , 2 
		and     x5 , x5 , x0 
		addi    x1 , x0 , 0 
		beq     x5 , x1 , Pass 
Bigger_i:
		ori     x19 , x10 , 196 
		sub     x5 , x13 , x10 
		srai    x5 , x5 , 2 
		and     x5 , x5 , x0 
		addi    x1 , x0 , 0 
		beq     x5 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
