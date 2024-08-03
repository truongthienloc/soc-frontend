.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 5 
		addi    x1 , x0 , 4 
		sltu    x18 , x22 , x1 
		bltu    x22 , x1 , Less_i 
		bgeu    x22 , x1 , Bigger_i 
Less_i:
		ori     x7 , x22 , 133 
		sub     x15 , x1 , x22 
		srai    x15 , x15 , 4 
		and     x15 , x15 , x0 
		addi    x4 , x0 , 0 
		beq     x15 , x4 , Pass 
Bigger_i:
		ori     x7 , x22 , 21 
		sub     x15 , x1 , x22 
		srai    x15 , x15 , 4 
		and     x15 , x15 , x0 
		addi    x4 , x0 , 0 
		beq     x15 , x4 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
