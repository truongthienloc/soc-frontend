.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 80 
		addi    x9 , x0 , 79 
		sltu    x3 , x20 , x9 
		bltu    x20 , x9 , Less_i 
		bgeu    x20 , x9 , Bigger_i 
Less_i:
		ori     x14 , x20 , 165 
		sub     x22 , x9 , x20 
		srai    x22 , x22 , 0 
		and     x22 , x22 , x0 
		addi    x28 , x0 , 0 
		beq     x22 , x28 , Pass 
Bigger_i:
		ori     x14 , x20 , 28 
		sub     x22 , x9 , x20 
		srai    x22 , x22 , 4 
		and     x22 , x22 , x0 
		addi    x28 , x0 , 0 
		beq     x22 , x28 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
