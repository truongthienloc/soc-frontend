.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , -2048 
		addi    x25 , x0 , 175 
		sltu    x19 , x29 , x25 
		bltu    x29 , x25 , Less_i 
		bgeu    x29 , x25 , Bigger_i 
Less_i:
		ori     x9 , x29 , 12 
		sub     x12 , x25 , x29 
		srai    x12 , x12 , 2 
		and     x12 , x12 , x0 
		addi    x21 , x0 , 0 
		beq     x12 , x21 , Pass 
Bigger_i:
		ori     x9 , x29 , 76 
		sub     x12 , x25 , x29 
		srai    x12 , x12 , 4 
		and     x12 , x12 , x0 
		addi    x21 , x0 , 0 
		beq     x12 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
