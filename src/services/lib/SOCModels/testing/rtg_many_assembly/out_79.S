.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , -2048 
		addi    x27 , x0 , 100 
		sltu    x20 , x13 , x27 
		bltu    x13 , x27 , Less_i 
		bgeu    x13 , x27 , Bigger_i 
Less_i:
		ori     x7 , x13 , 4 
		sub     x31 , x27 , x13 
		srai    x31 , x31 , 3 
		and     x31 , x31 , x0 
		addi    x2 , x0 , 0 
		beq     x31 , x2 , Pass 
Bigger_i:
		ori     x7 , x13 , 179 
		sub     x31 , x27 , x13 
		srai    x31 , x31 , 2 
		and     x31 , x31 , x0 
		addi    x2 , x0 , 0 
		beq     x31 , x2 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
