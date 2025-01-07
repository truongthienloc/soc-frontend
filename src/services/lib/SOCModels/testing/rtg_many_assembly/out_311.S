.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 176 
		addi    x21 , x0 , 175 
		sltu    x15 , x18 , x21 
		bltu    x18 , x21 , Less_i 
		bgeu    x18 , x21 , Bigger_i 
Less_i:
		ori     x29 , x18 , 85 
		sub     x9 , x21 , x18 
		srai    x9 , x9 , 1 
		and     x9 , x9 , x0 
		addi    x4 , x0 , 0 
		beq     x9 , x4 , Pass 
Bigger_i:
		ori     x29 , x18 , 72 
		sub     x9 , x21 , x18 
		srai    x9 , x9 , 0 
		and     x9 , x9 , x0 
		addi    x4 , x0 , 0 
		beq     x9 , x4 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
