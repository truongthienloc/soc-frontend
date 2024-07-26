.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 3 
		addi    x22 , x0 , 2 
		sltu    x3 , x17 , x22 
		bltu    x17 , x22 , Less_i 
		bgeu    x17 , x22 , Bigger_i 
Less_i:
		ori     x18 , x17 , 152 
		sub     x4 , x22 , x17 
		srai    x4 , x4 , 1 
		and     x4 , x4 , x0 
		addi    x9 , x0 , 0 
		beq     x4 , x9 , Pass 
Bigger_i:
		ori     x18 , x17 , 58 
		sub     x4 , x22 , x17 
		srai    x4 , x4 , 3 
		and     x4 , x4 , x0 
		addi    x9 , x0 , 0 
		beq     x4 , x9 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
