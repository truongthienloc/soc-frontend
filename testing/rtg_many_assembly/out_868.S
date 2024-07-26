.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 42 
		addi    x29 , x0 , 41 
		sltu    x1 , x9 , x29 
		bltu    x9 , x29 , Less_i 
		bgeu    x9 , x29 , Bigger_i 
Less_i:
		ori     x5 , x9 , 87 
		sub     x24 , x29 , x9 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x21 , x0 , 0 
		beq     x24 , x21 , Pass 
Bigger_i:
		ori     x5 , x9 , 161 
		sub     x24 , x29 , x9 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x21 , x0 , 0 
		beq     x24 , x21 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
