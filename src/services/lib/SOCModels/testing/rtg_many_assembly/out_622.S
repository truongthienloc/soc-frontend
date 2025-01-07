.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , -2048 
		addi    x25 , x0 , 46 
		sltu    x26 , x17 , x25 
		bltu    x17 , x25 , Less_i 
		bgeu    x17 , x25 , Bigger_i 
Less_i:
		ori     x16 , x17 , 91 
		sub     x21 , x25 , x17 
		srai    x21 , x21 , 4 
		and     x21 , x21 , x0 
		addi    x19 , x0 , 0 
		beq     x21 , x19 , Pass 
Bigger_i:
		ori     x16 , x17 , 148 
		sub     x21 , x25 , x17 
		srai    x21 , x21 , 1 
		and     x21 , x21 , x0 
		addi    x19 , x0 , 0 
		beq     x21 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
