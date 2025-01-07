.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , -2048 
		addi    x21 , x0 , 62 
		sltu    x29 , x15 , x21 
		bltu    x15 , x21 , Less_i 
		bgeu    x15 , x21 , Bigger_i 
Less_i:
		ori     x30 , x15 , 67 
		sub     x5 , x21 , x15 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x19 , x0 , 0 
		beq     x5 , x19 , Pass 
Bigger_i:
		ori     x30 , x15 , 175 
		sub     x5 , x21 , x15 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x19 , x0 , 0 
		beq     x5 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
