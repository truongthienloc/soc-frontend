.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 46 
		addi    x28 , x0 , 45 
		sltu    x20 , x13 , x28 
		bltu    x13 , x28 , Less_i 
		bgeu    x13 , x28 , Bigger_i 
Less_i:
		ori     x2 , x13 , 118 
		sub     x14 , x28 , x13 
		srai    x14 , x14 , 3 
		and     x14 , x14 , x0 
		addi    x22 , x0 , 0 
		beq     x14 , x22 , Pass 
Bigger_i:
		ori     x2 , x13 , 102 
		sub     x14 , x28 , x13 
		srai    x14 , x14 , 0 
		and     x14 , x14 , x0 
		addi    x22 , x0 , 0 
		beq     x14 , x22 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
