.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 27 
		addi    x27 , x0 , 26 
		sltu    x2 , x1 , x27 
		bltu    x1 , x27 , Less_i 
		bgeu    x1 , x27 , Bigger_i 
Less_i:
		ori     x8 , x1 , 17 
		sub     x25 , x27 , x1 
		srai    x25 , x25 , 0 
		and     x25 , x25 , x0 
		addi    x24 , x0 , 0 
		beq     x25 , x24 , Pass 
Bigger_i:
		ori     x8 , x1 , 112 
		sub     x25 , x27 , x1 
		srai    x25 , x25 , 0 
		and     x25 , x25 , x0 
		addi    x24 , x0 , 0 
		beq     x25 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
