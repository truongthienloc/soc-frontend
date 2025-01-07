.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 36 
		addi    x9 , x0 , -2048 
		slti    x21 , x3 , 663 
		bltu    x3 , x9 , Less_i 
		bgeu    x3 , x9 , Bigger_i 
Less_i:
		ori     x22 , x3 , 160 
		sub     x25 , x9 , x3 
		srai    x25 , x25 , 0 
		and     x25 , x25 , x0 
		addi    x16 , x0 , 0 
		beq     x25 , x16 , Pass 
Bigger_i:
		ori     x22 , x3 , 37 
		sub     x25 , x9 , x3 
		srai    x25 , x25 , 0 
		and     x25 , x25 , x0 
		addi    x16 , x0 , 0 
		beq     x25 , x16 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
