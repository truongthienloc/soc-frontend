.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 71 
		addi    x17 , x0 , -2048 
		slti    x31 , x22 , 702 
		bltu    x22 , x17 , Less_i 
		bgeu    x22 , x17 , Bigger_i 
Less_i:
		ori     x6 , x22 , 95 
		sub     x2 , x17 , x22 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x21 , x0 , 0 
		beq     x2 , x21 , Pass 
Bigger_i:
		ori     x6 , x22 , 189 
		sub     x2 , x17 , x22 
		srai    x2 , x2 , 0 
		and     x2 , x2 , x0 
		addi    x21 , x0 , 0 
		beq     x2 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
