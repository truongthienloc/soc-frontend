.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 35 
		addi    x21 , x0 , -2048 
		slti    x2 , x9 , 172 
		bltu    x9 , x21 , Less_i 
		bgeu    x9 , x21 , Bigger_i 
Less_i:
		ori     x1 , x9 , 8 
		sub     x22 , x21 , x9 
		srai    x22 , x22 , 2 
		and     x22 , x22 , x0 
		addi    x17 , x0 , 0 
		beq     x22 , x17 , Pass 
Bigger_i:
		ori     x1 , x9 , 8 
		sub     x22 , x21 , x9 
		srai    x22 , x22 , 4 
		and     x22 , x22 , x0 
		addi    x17 , x0 , 0 
		beq     x22 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
