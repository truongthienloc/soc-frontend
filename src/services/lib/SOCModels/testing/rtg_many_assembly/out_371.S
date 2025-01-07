.text

#The program finds the value of fibonacci 

Fibo:
		addi    x31 , x0 , 8 
		addi    x27 , x0 , 1 
		addi    x7 , x0 , 1 
		addi    x5 , x0 , 3 
		beq     x31 , x0 , Result0 
		beq     x31 , x7 , Result1 
Loop: 
		blt     x31 , x5 , Result 
		add     x25 , x27 , x7 
		addi    x27 , x7 , 0 
		addi    x7 , x25 , 0 
		addi    x5 , x5 , 1 
		jal     x0 , Loop 
Result0:
		addi    x25 , x0 , 0 
		addi    x29 , x0 , 0 
		bne     x25 , x29 , Fail 
Result1:
		addi    x25 , x0 , 1 
		addi    x1 , x0 , 1 
		bne     x25 , x1 , Fail 
Result:
		addi    x14 , x0 , 21 
		bne     x25 , x14 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
