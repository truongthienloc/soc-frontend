.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 99 
		addi    x14 , x0 , 98 
		sltu    x16 , x15 , x14 
		bltu    x15 , x14 , Less_i 
		bgeu    x15 , x14 , Bigger_i 
Less_i:
		ori     x6 , x15 , 163 
		sub     x18 , x14 , x15 
		srai    x18 , x18 , 2 
		and     x18 , x18 , x0 
		addi    x13 , x0 , 0 
		beq     x18 , x13 , Pass 
Bigger_i:
		ori     x6 , x15 , 124 
		sub     x18 , x14 , x15 
		srai    x18 , x18 , 1 
		and     x18 , x18 , x0 
		addi    x13 , x0 , 0 
		beq     x18 , x13 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
