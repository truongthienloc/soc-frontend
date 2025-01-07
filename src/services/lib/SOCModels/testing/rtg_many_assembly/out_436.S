.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , -2048 
		addi    x27 , x0 , 159 
		sltu    x11 , x22 , x27 
		bltu    x22 , x27 , Less_i 
		bgeu    x22 , x27 , Bigger_i 
Less_i:
		ori     x17 , x22 , 186 
		sub     x13 , x27 , x22 
		srai    x13 , x13 , 0 
		and     x13 , x13 , x0 
		addi    x3 , x0 , 0 
		beq     x13 , x3 , Pass 
Bigger_i:
		ori     x17 , x22 , 20 
		sub     x13 , x27 , x22 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x3 , x0 , 0 
		beq     x13 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
