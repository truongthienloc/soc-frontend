.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 115 
		addi    x9 , x0 , 114 
		sltu    x23 , x18 , x9 
		bltu    x18 , x9 , Less_i 
		bgeu    x18 , x9 , Bigger_i 
Less_i:
		ori     x17 , x18 , 179 
		sub     x14 , x9 , x18 
		srai    x14 , x14 , 2 
		and     x14 , x14 , x0 
		addi    x1 , x0 , 0 
		beq     x14 , x1 , Pass 
Bigger_i:
		ori     x17 , x18 , 90 
		sub     x14 , x9 , x18 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x1 , x0 , 0 
		beq     x14 , x1 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
