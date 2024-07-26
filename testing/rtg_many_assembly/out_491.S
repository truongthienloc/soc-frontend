.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 168 
		addi    x10 , x0 , 167 
		sltu    x13 , x9 , x10 
		bltu    x9 , x10 , Less_i 
		bgeu    x9 , x10 , Bigger_i 
Less_i:
		ori     x4 , x9 , 153 
		sub     x1 , x10 , x9 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x24 , x0 , 0 
		beq     x1 , x24 , Pass 
Bigger_i:
		ori     x4 , x9 , 100 
		sub     x1 , x10 , x9 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x24 , x0 , 0 
		beq     x1 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
