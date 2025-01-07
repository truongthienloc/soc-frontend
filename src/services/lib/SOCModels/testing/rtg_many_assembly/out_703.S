.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 13 
		addi    x6 , x0 , 12 
		sltu    x13 , x26 , x6 
		bltu    x26 , x6 , Less_i 
		bgeu    x26 , x6 , Bigger_i 
Less_i:
		ori     x11 , x26 , 84 
		sub     x25 , x6 , x26 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x21 , x0 , 0 
		beq     x25 , x21 , Pass 
Bigger_i:
		ori     x11 , x26 , 175 
		sub     x25 , x6 , x26 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x21 , x0 , 0 
		beq     x25 , x21 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
